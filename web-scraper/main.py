import requests
from bs4 import BeautifulSoup

"""xml = requests.get('https://www.fresnostate.edu/catalog-xml/frcourses.xml').text
soup = BeautifulSoup(xml, 'xml')
for course in soup.find_all('COURSE'):
    print(course.CRSE_ID.text)
    print(course.SUBJECT_ID.text)
    print(course.CATALOG_NBR.text)
    print(course.UNITS_RANGE.text)
    print(course.UNIT_REPEAT_LIMIT.text)
    print(course.CRSE_TITLE.text)
    print(course.CRSE_DESCR.text)
    print(course.CRSE_TYP_OFFR.text)
    print(course.GE_ATTRIBUTE.text)
    print(course.CRSE_CAREER.text)
    print(course.CRSE_UPDATE.text)
    print(course.DEPT_ID.text)"""

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
subjectIds = ['ACCT', 'AFRS', 'AGBS', 'AGED', 'AGRI', 'AH', 'AIS', 'ANTH', 'ARAB', 'ARM', 'ARMS', 'ART', 'ARTDS', 'ARTH', 'ASAM', 'ASCI', 'ASP', 'AT', 'ATHL', 'BA', 'BIOL', 'BIOTC', 'CE', 'CFS', 'CGSCI', 'CHEM', 'CHIN', 'CI', 'CLAS', 'CM', 'COMM', 'COMS', 'COUN', 'CRIM', 'CRP', 'CSB', 'CSCI', 'CSDS', 'CSM', 'CST', 'CULG', 'DANCE', 'DRAMA', 'DS', 'EAD', 'ECE', 'ECON', 'EDL', 'EES', 'EHD', 'ENGL', 'ENGR', 'ENOL', 'ENTR', 'ERE', 'ESE', 'ESM', 'FBS', 'FCS', 'FIN', 'FL', 'FM', 'FN', 'FREN', 'FSC', 'FSM', 'GD', 'GEOG', 'GERM', 'GERON', 'GME', 'GRK', 'HEAL', 'HEBR', 'HEC', 'HHS', 'HIST', 'HMONG', 'HONOR', 'HRM', 'HUM', 'IAS', 'ID', 'INTD', 'IS', 'ISA', 'IT', 'ITAL', 'JAPN', 'JS', 'KAC', 'KINES', 'LATIN', 'LEE', 'LING', 'LS', 'MATH', 'MBA', 'MCJ', 'ME', 'MEAG', 'MES', 'MGT', 'MKTG', 'MPA', 'MS', 'MSA', 'MUSIC', 'NSCI', 'NURS', 'NUTR', 'PAX', 'PERS', 'PH', 'PHIL', 'PHTH', 'PHYS', 'PLANT', 'PLSI', 'PORT', 'PSCI', 'PSYCH', 'RA', 'REC', 'REHAB', 'SOC', 'SPAN', 'SPED', 'SSCI', 'SWRK', 'UNIV', 'VEN', 'VIT', 'WGSS']
for subjectId in subjectIds:
    cookies = {
        'CFRPRD-PSJSESSIONID': sessionId,
    }

    data = {
        'ICStateNum': icStateNum,
        'ICAction': 'CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH',
        #'CLASS_SRCH_WRK2_STRM$35$': '2227',
        'SSR_CLSRCH_WRK_SUBJECT$0': subjectId,
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