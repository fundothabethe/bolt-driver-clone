import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#00000099',
  },

  declineBtn: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  declineText: {
    color: 'lightgrey',
    fontWeight: 'bold',
  },

  container: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 250,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  row: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  uberType: {
    color: 'lightgrey',
    fontSize: 26,
    marginHorizontal: 10,
  },
  userBG: {
    backgroundColor: '#188ebf',
    width: 60,
    height: 60,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
  },

  min: {
    color: 'lightgrey',
    fontSize: 36,
  },

  distance: {
    color: 'lightgrey',
    fontSize: 20,
  },
});
export default style;
