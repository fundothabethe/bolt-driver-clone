import {Dimensions, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  bottomContainer: {
    height: 150,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  bottomText: {
    fontSize: 22,
    color: '#4a4a4a',
  },
  roundBtn: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 25,
  },
  goBtn: {
    position: 'absolute',
    backgroundColor: '#1495ff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
    padding: 10,
    borderRadius: 50,
    bottom: 160,
    left: Dimensions.get('window').width / 2 - 37,
  },
  goText: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    padding: 0,
  },
  balanceBtn: {
    position: 'absolute',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    padding: 5,
    borderRadius: 50,
    top: 10,
    left: Dimensions.get('window').width / 2 - 50,
  },
  balanceText: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
  },
});

export default style;
