This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# FamilyFlow – Smart Chore & Reward App for Parents & Kids

FamilyFlow is a cross-platform mobile app built with React Native that helps parents manage household tasks, reward children, and track progress.
This app includes authentication, role-based access, task management, family groups, comments, geolocation, and much more.

## Features

### Family Roles

Parent accounts

Child accounts

Shared familyCode to join a household

### Task Management

Parents create tasks and assign a child or leave unassigned so children can claim

Children complete tasks & upload image proof

Parents verify completed tasks

Points system [only when the task is verified]

Recurring tasks (daily/weekly/custom days) [underdevelopment] but parent can create tasks with a due date

### Communication

Comment thread on each task

Parent ↔ Child conversation

### GPS & Maps (Sensor Feature)

Children automatically send last known GPS location [Require google API, underdevelopment]

Parents can view each child on a map [underdevelopment]

### Onboarding Flow

First-time user intro screens

### Internationalization

English + Norwegian via react-i18next

Language switch saved to AsyncStorage

### UI & Theming

Clean modern layout

Light/dark mode switch. global context is used to apply settings

### Navigation

Bottom tab navigation

Nested stack navigation for task details & family screens

## Backend (Node + Express + MongoDB)

JWT auth

MongoDB Atlas

Secure password hashing with bcrypt

REST API for tasks, users, comments, family groups

## Tech Stack

Layer Technologies
Mobile App React Native • TypeScript • Axios • AsyncStorage • react-navigation
Backend Node.js • Express • MongoDB • Mongoose • JWT
Sensors react-native-geolocation-service
UI/UX Lottie animations • Custom components

# How to Run

Backend

```sh
cd server
npm install
npm run dev
```

```sh
Mobile App
cd FamilyFlow
npm install
npm run start
npm run android
```

Make sure backend URL is updated in apiClient.ts as well as environment variables

```

```
FAMILYFLOW/
├── server/
│ ├── node_modules/
│ ├── src/
│ │ ├── models/
│ │ │ ├── comment.ts
│ │ │ ├── Task.ts
│ │ │ └── userModel.ts
│ │ ├── routes/
│ │ │ ├── authRoutes.ts
│ │ │ ├── locationRoutes.ts
│ │ │ ├── taskRoutes.ts
│ │ │ ├── uploadRoutes.ts
│ │ │ └── userRoutes.ts
│ │ ├── types/
│ │ │ ├── commentTypes.ts
│ │ │ ├── tasktypes.ts
│ │ │ └── userTypes.ts
│ │ └── server.ts
│ ├── uploads/
│ │ ├── 1763702903004-1000016780.jpg
│ │ ├── 1763703069599-1000016779.jpg
│ │ └── 1764538046594-1000016880.jpg
│ ├── .env
│ ├── nodemon.json
│ ├── package-lock.json
│ ├── package.json
│ └── tsconfig.json
│
├── src/
│ ├── api/
│ │ ├── apiClient.ts
│ │ ├── locationApi.ts
│ │ ├── taskApi.ts
│ │ └── userApi.ts
│
│ ├── assets/
│ │ ├── animations/
│ │ │ └── fireworks.json
│ │ ├── images/
│ │ │ ├── avatar1.png
│ │ │ └── avatar2.png
│ │ └── onboarding/
│ │ ├── fam.png
│ │ ├── fam2.png
│ │ └── fam3.png
│
│ ├── components/
│ │ ├── Cards/
│ │ │ ├── StatCard.tsx
│ │ │ └── TaskCard.tsx
│ │ ├── Task/
│ │ │ ├── ChildAction.tsx
│ │ │ ├── CommentList.tsx
│ │ │ ├── DatePickerInput.tsx
│ │ │ ├── FireworksAnim.tsx
│ │ │ ├── ParentAction.tsx
│ │ │ ├── ProofImage.tsx
│ │ │ └── TaskHeader.tsx
│ │ ├── TaskForm/
│ │ │ ├── DaySelector.tsx
│ │ │ ├── LabeledInput.tsx
│ │ │ └── RecurrencePicker.tsx
│ │ └── Buttons.tsx
│
│ ├── context/
│ │ ├── AuthContextProvider.tsx
│ │ ├── TaskContext.tsx
│ │ └── ThemeContext.tsx
│
│ ├── hooks/
│ │ ├── useFamilyMembers.ts
│ │ ├── useTaskActions.ts
│ │ ├── useTaskForm.ts
│ │ ├── useTaskStat.ts
│ │ └── useUpdateLocation.ts
│
│ ├── i18n/
│ │ ├── languages/
│ │ │ ├── en.json
│ │ │ └── no.json
│ │ └── index.ts
│
│ ├── navigation/
│ │ ├── AppNavigator.tsx
│ │ ├── AuthStack.tsx
│ │ ├── FamilyStackNavigator.tsx
│ │ ├── MainTabs.tsx
│ │ └── TaskStackNavigator.tsx
│
│ ├── screens/
│ │ ├── Auth/
│ │ │ ├── Login.tsx
│ │ │ └── Register.tsx
│ │ ├── Tasks/
│ │ │ ├── TaskDetailScreen.tsx
│ │ │ ├── TaskFormScreen.tsx
│ │ │ ├── TaskListScreen.tsx
│ │ │ ├── UnassignedTasksScreen.tsx
│ │ │ ├── AddChildScreen.tsx
│ │ │ ├── ChildLocationMap.tsx
│ │ │ ├── ChildLocationScreen.tsx
│ │ │ ├── HomeScreen.tsx
│ │ │ ├── OnboardingScreen.tsx
│ │ │ ├── SettingScreen.tsx
│ │ │ └── TaskScreen.tsx
│
│ ├── services/
│ │ ├── task.ts
│ │ └── user.ts
│
│ ├── utils/
│ │ ├── colors.ts
│ │ └── slides.ts
│
│ ├── App.tsx
│ ├── app.json
│ ├── .eslintrc.js
│ ├── .gitignore
│ ├── .prettierrc.js
│ └── .watchmanconfig
│
└── package.json

