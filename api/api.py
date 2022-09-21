from flask import Flask, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import re
import datetime

app = Flask(__name__)
CORS(app)

@app.route('/')
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
    response = session.post('https://cmsweb.fresnostate.edu/psc/CFRPRD/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL', data=data)
    sessionId = session.cookies['CFRPRD-PSJSESSIONID']
    icStateNum = 1
    classes = []
    for className in request.args.getlist('classes'):
        cookies = {
            'CFRPRD-PSJSESSIONID': sessionId,
        }

        data = {
            'ICStateNum': icStateNum,
            'ICAction': 'CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH',
            #'CLASS_SRCH_WRK2_STRM$35$': '2227',
            'SSR_CLSRCH_WRK_SUBJECT$0': className.split()[0],
            'SSR_CLSRCH_WRK_SSR_EXACT_MATCH1$1': 'E',
            'SSR_CLSRCH_WRK_CATALOG_NBR$1': className.split()[1],
            #'SSR_CLSRCH_WRK_SSR_OPEN_ONLY$chk$4': 'N',
        }

        response = requests.post('https://cmsweb.fresnostate.edu/psc/CFRPRD/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL', cookies=cookies, data=data)
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

            response = requests.post('https://cmsweb.fresnostate.edu/psc/CFRPRD/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL', cookies=cookies, data=data)
            soup = BeautifulSoup(response.text, 'html5lib')
        
        errorText = soup.find(id='DERIVED_CLSMSG_ERROR_TEXT')
        if errorText:
            icStateNum += 1
            continue
        
        for classTable in soup.find_all(id=lambda x: x and x.startswith('win0divSSR_CLSRSLT_WRK_GROUPBOX2$')):
            classTableIndex = classTable.get('id')[33:]
            className = classTable.find(id=f'win0divSSR_CLSRSLT_WRK_GROUPBOX2GP${classTableIndex}').text
            print(className)
            sections = []
            for classRow in classTable.find_all(id=lambda x: x and x.startswith('win0divSSR_CLSRSLT_WRK_GROUPBOX3$')):
                classRowIndex = classRow.get('id')[33:]
                classNumber = classRow.find(id=f'MTG_CLASS_NBR${classRowIndex}').text
                classSection = classRow.find(id=f'MTG_CLASSNAME${classRowIndex}').text
                classDayTime = classRow.find(id=f'MTG_DAYTIME${classRowIndex}').text
                classRoom = classRow.find(id=f'MTG_ROOM${classRowIndex}').text
                classInstructor = classRow.find(id=f'MTG_INSTR${classRowIndex}').text
                classMeetingDates = classRow.find(id=f'MTG_TOPIC${classRowIndex}').text
                print(classNumber)
                print(classSection)
                print(classDayTime)
                print(classRoom)
                print(classInstructor)
                print(classMeetingDates)
                sections.append({ 'days': re.findall('[A-Z][^A-Z]*', classDayTime.split()[0]), 'startTime': datetime.datetime.strptime(classDayTime.split()[1], '%I:%M%p').time().isoformat(), 'endTime': datetime.datetime.strptime(classDayTime.split()[3], '%I:%M%p').time().isoformat(), 'room': classRoom, 'instructor': classInstructor })
            classes.append({ 'name': className, 'sections': sections })
    schedules = generate_schedules(classes, 0)
    return schedules

def generate_schedules(classes, level):
    if level >= len(classes):
        return [[]]
    
    schedules = []
    for section in classes[level]['sections']:
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
                if (class2['startTime'] >= class1['startTime'] and class2['startTime'] <= class1['endTime']) or (class2['endTime'] >= class1['startTime'] and class2['endTime'] <= class1['endTime']) or (class2['startTime'] < class1['startTime'] and class2['endTime'] > class1['endTime']):
                    return False
    return True