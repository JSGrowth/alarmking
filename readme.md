# Goals of this project

- 불편한 알람 App, 직접 만들어서 써보자 (수학문제 또는 문장입력 기능)
- Application 배포 경험
- React, Javascript 연습 프로젝트

## Todo-List

- CreateAlarm, EditAlarm, etc... async storage에 저장된 데이터 다룰때 화면에 properly 반영되도록... flag를 써야하나?
- Alarm의 Time이 보여지는 것과 다르게 생성, 변경되는 문제(occational error...)
- 데이터 저장 구조 (Redux?)
- pass navigation params ex) AddAlarm -> Song, Repeat... (react, typescript, navigation 공부 필요)
- Alarm 이 잘 trigger 되도록 확인
- 그 외... (snooze, arithmetic question or type sentence to turn off the alarm)

## how to resolve error while using npm vector-icon

- follow the instructions in https://github.com/oblador/react-native-vector-icons
- you need to edit info.plist to use vector icons' tff in react-native(already done)
- resource setting for android env is not done yet

### packages that i used

- https://github.com/liplylie/react-native-simple-alarm.git
- https://github.com/oblador/react-native-vector-icons.git
- https://github.com/henninghall/react-native-date-picker.git
