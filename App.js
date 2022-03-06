import Amplify, {API, Auth, graphqlOperation} from 'aws-amplify';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import config from './src/aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native/dist/Auth';
Amplify.configure(config);
import {getCarID} from './src/graphql/queries';
import {createCar} from './src/graphql/mutations';

const App = () => {
  //
  const updateUserCar = async () => {
    //get auth user
    const authenticateUser = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });

    if (!authenticateUser) {
      console.log('UnAuthenticated user');
      return;
    }

    //check database for users ID

    const carData = await API.graphql(
      graphqlOperation(getCarID, {
        id: authenticateUser.attributes.sub,
      }),
    );

    console.log(carData);

    //check if user hav a car
    if (!!carData.data.getCar) {
      console.log('driver have a car');
      return;
    }

    //create new car if no car for driver

    const newCar = {
      id: authenticateUser.attributes.sub,
      type: 'UberX',
      userID: authenticateUser.attributes.sub,
      latitude: 4.55654,
      longitude: 45.265,
      heading: 130.5,
    };
    await API.graphql(graphqlOperation(createCar, {input: newCar}));
    console.log('created car for you');
  };

  useEffect(() => {
    //
    updateUserCar();
  }, []);
  return (
    <SafeAreaView>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
