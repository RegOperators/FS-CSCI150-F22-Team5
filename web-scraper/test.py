import datetime

classes = [
    { 'name': 'CSCI 117', 'sections': [{ 'id': '1', 'startTime': datetime.time.fromisoformat('07:00:00.000000'), 'endTime': datetime.time.fromisoformat('08:00:00.000000') }, { 'id': '2', 'startTime': datetime.time.fromisoformat('09:00:00.000000'), 'endTime': datetime.time.fromisoformat('10:00:00.000000') }] },
    { 'name': 'CSCI 115', 'sections': [{ 'id': '3', 'startTime': datetime.time.fromisoformat('07:00:00.000000'), 'endTime': datetime.time.fromisoformat('08:00:00.000000') }, { 'id': '4', 'startTime': datetime.time.fromisoformat('11:00:00.000000'), 'endTime': datetime.time.fromisoformat('12:00:00.000000') }] },
    { 'name': 'CSCI 41', 'sections': [{ 'id': '5', 'startTime': datetime.time.fromisoformat('07:00:00.000000'), 'endTime': datetime.time.fromisoformat('08:00:00.000000') }, { 'id': '6', 'startTime': datetime.time.fromisoformat('14:00:00.000000'), 'endTime': datetime.time.fromisoformat('15:00:00.000000') }] }
]
schedules = []
def generateSchedules(schedule, level):
    if level >= len(classes):
        if isValidSchedule(schedule):
            schedules.append(schedule)
        return
    
    for section in classes[level]['sections']:
        newSchedule = schedule.copy()
        newSchedule.append(section)
        #print(classes[level]['name'] + ' - ' + section)
        generateSchedules(newSchedule, level + 1)

def isValidSchedule(schedule):
    for class1 in schedule:
        for class2 in schedule:
            if class1 == class2:
                continue
            
            if (class2['startTime'] >= class1['startTime'] and class2['startTime'] <= class1['endTime']) or (class2['endTime'] >= class1['startTime'] and class2['endTime'] <= class1['endTime']) or (class2['startTime'] < class1['startTime'] and class2['endTime'] > class1['endTime']):
                return False
    return True

generateSchedules([], 0)
for schedule in schedules:
    print(schedule)