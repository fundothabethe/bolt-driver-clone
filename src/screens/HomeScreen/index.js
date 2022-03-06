import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View, Pressable, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import style from './style';
import NewOrder from '../../components/NewOrder';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getCar, getOrder, listOrders} from '../../graphql/queries';
import {updateCar} from '../../graphql/mutations';
import API, {graphqlOperation} from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';

const HomeScreen = () => {
  //

  const [car, setCar] = useState(null);
  const [order, setOrder] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [newOrders, setNewOrders] = useState([]);

  //create order

  //

  const onGoPress = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();

      //query car with the same user id

      const input = {
        id: userData.attributes.sub,
        isActive: !car.isActive,
      };

      //

      const updateCarData = await API.graphql(
        graphqlOperation(updateCar, {
          input,
        }),
      );

      setCar(updateCarData.data.updateCar);
      console.log(updateCarData);
    } catch (error) {
      console.error(error);
    }
  };

  const decline = () => {
    setNewOrders(newOrders.slice(1));
  };

  const accept = newOrder => {
    setOrder(newOrder);
    setNewOrders(newOrders.slice(1));
  };

  const onUserLocationChange = e => {
    setMyPosition(e.nativeEvent.coordinate);
  };

  const onDirectionFound = e => {
    setOrder({
      ...order,
      distance: e.distance,
      duration: e.duration,
      pickedUp: order.pickedUp || e.distance < 3.1,
      isFinished: order.pickedUp && e.distance < 3.1,
    });
  };

  //

  const fetchOrders = async () => {
    try {
      //query orders
      const orderData = await API.graphql(
        graphqlOperation(listOrders),
        // , {filter: {status: {eq: 'NEW'}},}
      );

      const orderOne = await API.graphql(
        graphqlOperation(getOrder),
        // , {filter: {status: {eq: 'NEW'}},}
      );
      console.log(orderOne);

      //
      setNewOrders(orderData.data.listOrders.items);
    } catch (error) {
      console.error(error);
    }
  };

  //
  const fetchCar = async () => {
    try {
      //gets Current signed in user

      const userData = await Auth.currentAuthenticatedUser();

      //query car with the same user id

      const carData = await API.graphql(
        graphqlOperation(getCar, {
          id: userData.attributes.sub,
        }),
      );

      //set car info to a state variable

      setCar(carData.data.getCar);
    } catch (error) {
      //no internet connection

      console.error(error);
    }
  };

  useEffect(() => {
    //
    fetchCar();
    fetchOrders();
    //
  }, []);

  const renderBtnTitle = () => {
    if (order && order.isFinished) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#cd1a1a',
              padding: 20,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              COMPLETE {order.type}
            </Text>
          </View>
          <Text style={style.bottomText}>
            {order.user && order.user.username}
          </Text>
        </View>
      );
    }

    if (order && order.pickedUp) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View
              style={{
                backgroundColor: '#d41212',
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                marginHorizontal: 10,
              }}>
              <AntDesign name="user" size={20} color="lightgrey" />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} KM</Text>
          </View>
          <Text style={style.bottomText}>
            Dropping off {order.user && order.user.username}
          </Text>
        </View>
      );
    }

    if (order) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View
              style={{
                backgroundColor: '#48d42a',
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                marginHorizontal: 10,
              }}>
              <AntDesign name="user" size={20} color="lightgrey" />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} KM</Text>
          </View>
          <Text style={style.bottomText}>
            Picking up {order.user?.username}
          </Text>
        </View>
      );
    }
    if (car?.isActive) {
      return <Text style={style.bottomText}>"You're online"</Text>;
    }
    return <Text style={style.bottomText}>"You're offline"</Text>;
  };

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{width: '100%', height: Dimensions.get('window').height - 150}}
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: -24.9632083,
          longitude: 31.2729052,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {order && (
          <MapViewDirections
            onReady={onDirectionFound}
            origin={myPosition}
            destination={{
              latitude: order.originLatitude,
              longitude: order.originLongitude,
            }}
            apikey={'AIzaSyALKtKgnilyeNL8-K7nr65Fh3ZqjjYBiI8'}
            strokeColor="black"
            strokeWidth={5}
          />
        )}
      </MapView>

      <Pressable
        style={[style.roundBtn, {top: 10, left: 10}]}
        onPress={() => console.log('pressed')}>
        <Feather name="list" size={30} color="#4a4a4a" />
      </Pressable>

      {/* balance */}

      <Pressable
        style={style.balanceBtn}
        onPress={() => console.log('balance')}>
        <Text style={style.balanceText}>
          <Text style={{color: 'green'}}>R</Text> 0.00
        </Text>
      </Pressable>

      <Pressable
        style={[style.roundBtn, {top: 10, right: 10}]}
        onPress={() => console.log('pressed')}>
        <Feather name="list" size={30} color="#4a4a4a" />
      </Pressable>

      <Pressable
        style={[style.roundBtn, {bottom: 160, left: 10}]}
        onPress={() => console.log('pressed')}>
        <Feather name="list" size={30} color="#4a4a4a" />
      </Pressable>

      <Pressable
        style={[style.roundBtn, {bottom: 160, right: 10}]}
        onPress={() => console.log('pressed')}>
        <Feather name="list" size={30} color="#4a4a4a" />
      </Pressable>

      <Pressable style={style.goBtn} onPress={onGoPress}>
        <Text style={style.goText}>{car?.isActive ? 'END' : 'GO'}</Text>
      </Pressable>

      <View style={style.bottomContainer}>
        <Ionicons name="options" size={30} color="#4a4a4a" />
        {renderBtnTitle()}

        <Feather name="list" size={30} color="#4a4a4a" />
      </View>
      {newOrders.length > 0 && !order && (
        <NewOrder
          newOrder={newOrders[0]}
          decline={decline}
          duration={2}
          distance={3}
          accept={() => accept(newOrders[0])}
        />
      )}
    </View>
  );
};

export default HomeScreen;
