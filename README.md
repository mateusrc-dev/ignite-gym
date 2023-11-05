# Ignite Gym app built on Ignite's React-Navite track (Rocketseat)

In this application, the user can log in and mark the exercises they have performed, these exercises are saved in a history

We use techniques such as context, states, JWT to perform user authentication, consume API, etc.

#### One of the most important points in this project is that we use NativeBase to create our interfaces - NativeBase is a library of customizable components that we can use in our application and save time

#### Some components we used in NativeBase were: Center, Spinner, View, StatusBar, Image, Text, Heading, VStack, HStack, Input, Pressable, SectionList, Skeleton, ScrollView, etc.

### Some libraries we use in the project to build the application's functionalities and interface are:

- async-storage - to store user data on the device itself
- react-navigation/bottom-tabs - to create a menu bar at the bottom of the application
- react-navigation/native-stack - to create the navigation part of the application - create the routes
- axios - to make requests to the API
- expo-file-system - we can use this library to obtain information from a file on the user's device, regardless of whether the system is IOS or ANDROID
- expo-image-picker - to be able to choose images from the device gallery
- moment - lib to handle data
- react-hook-form - to be able to get the data from the inputs at the same time when the submit button is clicked, add rules for these fields, put default values ​​in the fields, catch errors when the data entered is not valid - instead of create a state for each input
- react-native-safe-area-context - so that interface components/elements are in safe spaces on the device so as not to run the risk of being hidden
- yup - to create the schema - schema is a model of our form (set of inputs) that we will use to define what the fields are and the validation rules for those fields

### To use the application on your PC, download the repository, then run the command 'npm run start' in the repository terminal (note. when executing this command it is important that the Android emulator is activated (Android Studio))
