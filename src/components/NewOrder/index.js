import React from 'react';
import {View, Text, Pressable} from 'react-native';
import style from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NewOrder = ({newOrder, accept, decline, duration, distance}) => {
  //

  return (
    <View style={style.root}>
      <Pressable style={style.declineBtn} onPress={decline}>
        <Text style={style.declineText}>Decline</Text>
      </Pressable>
      <Pressable onPress={accept} style={style.container}>
        <View style={style.row}>
          <Text style={style.uberType}>{newOrder.type}</Text>
          <View style={style.userBG}>
            <AntDesign name="user" size={20} color="lightgrey" />
          </View>
          <Text style={{color: 'white'}}>
            <AntDesign name="star" size={20} color="lightgrey" />{' '}
            {newOrder.user?.rating}
          </Text>
        </View>
        <Text style={style.min}>{duration} min</Text>
        <Text style={style.distance}>{distance} km</Text>
      </Pressable>
    </View>
  );
};

export default NewOrder;
