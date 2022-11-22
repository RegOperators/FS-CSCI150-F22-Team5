from flask import Flask, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import re
import datetime
import json

app = Flask(__name__)
CORS(app)

@app.route("/courses")
def get_course_info():  # convert course info xml to json obj indexed by courseID
    # scrape xml from site
    xml = requests.get('https://www.fresnostate.edu/catalog-xml/frcourses.xml').text
    soup = BeautifulSoup(xml, 'xml')

    # create empty 'master' dictionary to hold json entries
    catalogue = {}

    # iterate through all courses in the xml from site
    for course in soup.find_all('COURSE'):
        # create empty dictionary to hold current course json entry info
        entry = {}

        # iterate through each 'info field' in the current course
        for contents in course.contents[1:-1]:
            name = contents.name  # save the name of the current 'info field'
            text = contents.text  # save the text contained by the current 'info field'

            entry[name] = text # add current info field to current course json entry dict

        # Add current course json entry to 'master' dictionary
        catalogue[entry["CRSE_ID"]] = entry  # current entry's course ID is used for key name

    # Create json object from 'master' dictionary of all courses
    json_object = json.dumps(catalogue, indent=4, sort_keys=True)  # note that sorting is enabled

    # Return final json
    return json_object

@app.route("/terms")
def get_terms():  # get course terms
    # Get course search page html
    response = requests.get('https://portal.cms.fresnostate.edu/x/_class_search')
    soup = BeautifulSoup(response.text, 'html.parser')
    userid = soup.find('input', {'name': 'userid'}).get('value')
    pwd = soup.find('input', {'name': 'pwd'}).get('value')
    cmd = soup.find('input', {'name': 'cmd'}).get('value')
    languageCd = soup.find('input', {'name': 'languageCd'}).get('value')
    fr_guest_token = soup.find('input', {'name': 'fr_guest_token'}).get('value')
    session = requests.Session()
    data = {
        'userid': userid,
        'pwd': pwd,
        'cmd': cmd,
        'languageCd': languageCd,
        'fr_guest_token': fr_guest_token,
    }
    response = session.post(
        'https://cmsweb.fresnostate.edu/psc/CFRPRD/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL', data=data)

    soup = BeautifulSoup(response.text, 'html.parser')

    # create empty list to hold terms
    terms = []

    options = soup.find("select", {"id": "CLASS_SRCH_WRK2_STRM$35$"})  # find tag with term options
    children = options.findChildren()  # create list of children (options with terms)

    # Step through each option, skipping the first (since it's empty)
    for child in children[1:]:
        id = child['value']  # save term id
        name = child.contents[0]  # save term name
        terms.append({'id': id, 'name': name})  #

    return terms

@app.route('/', methods=['POST'])
def get_valid_schedules():
    response = requests.get('https://portal.cms.fresnostate.edu/x/_class_search')
    soup = BeautifulSoup(response.text, 'html5lib')
    
    userid = soup.find('input', {'name': 'userid'}).get('value')
    pwd = soup.find('input', {'name': 'pwd'}).get('value')
    cmd = soup.find('input', {'name': 'cmd'}).get('value')
    languageCd = soup.find('input', {'name': 'languageCd'}).get('value')
    fr_guest_token = soup.find('input', {'name': 'fr_guest_token'}).get('value')
    session = requests.Session()
    data = {
        'userid': userid,
        'pwd': pwd,
        'cmd': cmd,
        'languageCd': languageCd,
        'fr_guest_token': fr_guest_token,
    }
    response = session.post(
        'https://cmsweb.fresnostate.edu/psc/CFRPRD/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL', data=data)
    sessionId = session.cookies['CFRPRD-PSJSESSIONID']
    icStateNum = 1
    classes = []
    for courseName in request.json['courses']:
        cookies = {
            'CFRPRD-PSJSESSIONID': sessionId,
        }

        data = {
            'ICStateNum': icStateNum,
            'ICAction': 'CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH',
            'CLASS_SRCH_WRK2_STRM$35$': request.json['term'],
            'SSR_CLSRCH_WRK_SUBJECT$0': courseName.split()[0],
            'SSR_CLSRCH_WRK_SSR_EXACT_MATCH1$1': 'E',
            'SSR_CLSRCH_WRK_CATALOG_NBR$1': courseName.split()[1],
            'SSR_CLSRCH_WRK_SSR_OPEN_ONLY$chk$4': 'N',
        }

        response = requests.post(
            'https://cmsweb.fresnostate.edu/psc/CFRPRD/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL',
            cookies=cookies, data=data)
        soup = BeautifulSoup(response.text, 'html5lib')
        okButton = soup.find(id='#ICSave')
        if okButton:
            cookies = {
                'CFRPRD-PSJSESSIONID': sessionId,
            }

            data = {
                'ICStateNum': icStateNum + 1,
                'ICAction': '#ICSave',
            }

            response = requests.post(
                'https://cmsweb.fresnostate.edu/psc/CFRPRD/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL',
                cookies=cookies, data=data)
            soup = BeautifulSoup(response.text, 'html5lib')

        errorText = soup.find(id='DERIVED_CLSMSG_ERROR_TEXT') #if class doesn't exist increment the variable
        errorNum = 0                                           #variable has to be set for the site to work
        if errorText:
            icStateNum += 1
            continue
        

        # classTable = soup.find(id='win0divSSR_CLSRSLT_WRK_GROUPBOX2$0')
        # className = classTable.find(id='win0divSSR_CLSRSLT_WRK_GROUPBOX2GP$0').text
        # print(className)
        sectionGroups = {}
        courseId = ''
        # for index, classRow in enumerate(classTable.find_all(id=lambda x: x and x.startswith('win0divSSR_CLSRSLT_WRK_GROUPBOX3$'))):
        for index, classRow in enumerate(
                soup.find_all(id=lambda x: x and x.startswith('win0divSSR_CLSRSLT_WRK_GROUPBOX3$'))):
            classRowIndex = classRow.get('id')[33:]
            classNumber = classRow.find(id=f'MTG_CLASS_NBR${classRowIndex}').text
            classSection = classRow.find(id=f'MTG_CLASSNAME${classRowIndex}').text
            classDayTime = classRow.find(id=f'MTG_DAYTIME${classRowIndex}').text
            classRoom = classRow.find(id=f'MTG_ROOM${classRowIndex}').text
            classInstructor = classRow.find(id=f'MTG_INSTR${classRowIndex}').text
            classMeetingDates = classRow.find(id=f'MTG_TOPIC${classRowIndex}').text
            if index == 0:
                cookies = {
                    'CFRPRD-PSJSESSIONID': sessionId,
                }

                data = {
                    'ICStateNum': icStateNum + 1,
                    'ICAction': f'MTG_CLASS_NBR${classRowIndex}',
                }

                response = requests.post(
                    'https://cmsweb.fresnostate.edu/psc/CFRPRD/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL',
                    cookies=cookies, data=data)
                soup = BeautifulSoup(response.text, 'html5lib')
                courseId = soup.find(id='SSR_CLS_DTL_WRK_CRSE_ID').text
            sectionTypeId = classSection.split('-')[1]
            section = {'id': classNumber, 'number': classSection.split('-')[0], 'type': sectionTypeId,
                       'days': re.findall('[A-Z][^A-Z]*', classDayTime.split()[0]),
                       'startTime': datetime.datetime.strptime(classDayTime.split()[1], '%I:%M%p').time().isoformat(),
                       'endTime': datetime.datetime.strptime(classDayTime.split()[3], '%I:%M%p').time().isoformat(),
                       'room': classRoom, 'instructor': classInstructor.splitlines()[0], 'courseId': courseId,
                       'courseName': courseName}
            if sectionGroups.get(sectionTypeId) is None:
                sectionGroups[sectionTypeId] = [section]
            else:
                sectionGroups.get(sectionTypeId).append(section)
        classes.extend(sectionGroups.values())
    schedules = generate_schedules(classes, 0)
    return schedules


def generate_schedules(classes, level):
    if level >= len(classes):
        return [[]]

    schedules = []
    for section in classes[level]:
        for schedule in generate_schedules(classes, level + 1):
            schedule.append(section)
            if level == 0:
                if is_valid_schedule(schedule):
                    schedules.append(schedule)
            else:
                schedules.append(schedule)
    return schedules


def is_valid_schedule(schedule):
    for class1 in schedule:
        for class2 in schedule:
            if class1 == class2:
                continue

            if not set(class1['days']).isdisjoint(class2['days']):
                if (class2['startTime'] >= class1['startTime'] and class2['startTime'] <= class1['endTime']) or (
                        class2['endTime'] >= class1['startTime'] and class2['endTime'] <= class1['endTime']) or (
                        class2['startTime'] < class1['startTime'] and class2['endTime'] > class1['endTime']):
                    return False
    return True
