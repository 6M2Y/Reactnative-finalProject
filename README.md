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
