import OneSignal from "react-native-onesignal";

export function tagUserSignInCreate() {
    OneSignal.sendTag('sign_in', "true")
}

export function tagUserSignOutCreate() {
    OneSignal.sendTag('sign_in', "false")
}

export function tagLastDayExerciseRealized(day: string) {
    OneSignal.sendTag('last_day_exercise_realized', day)
}