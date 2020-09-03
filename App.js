/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ImageBackground,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [currentOrder, setCurrentOrder] = useState({name: '', waitTime: 0});
  const [readyOrders, setReadyOrders] = useState([]);
  const [queue, setQueue] = useState([]);
  useEffect(() => {
    if (queue.length > 0) {
      setCurrentOrder(queue[0]);
      if (currentOrder) {
        setTimeout(() => {
          let newQueue = queue;
          if (newQueue.length > 0) {
            const current = newQueue.shift();
            setQueue(newQueue);
            setReadyOrders([...readyOrders, current]);
          } else {
            setCurrentOrder(null);
          }
        }, currentOrder.waitTime * 1000);
      }
    }
  }, [queue, currentOrder, readyOrders]);
  useEffect(() => {
    setInterval(() => {
      let newReadyOrders = readyOrders;
      newReadyOrders.shift();
      setReadyOrders(newReadyOrders);
    }, 3000);
  }, [readyOrders]);
  const windowHeight = Dimensions.get('window').height;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        style={{width: '100%', height: windowHeight / 3}}
        source={require('./assets/coffee.jpg')}
      />
      <View style={styles.container}>
        <Text style={styles.titleText}>The Coffee Shop</Text>
        <View>
          <Text style={styles.headerText}>The Menu</Text>
          <Pressable
            style={styles.menuButton}
            onPress={() => {
              setQueue([...queue, {name: 'Cafe Au Lait', waitTime: 4}]);
            }}>
            <Text>Cafe Au Lait</Text>
          </Pressable>
          <Pressable
            style={styles.menuButton}
            onPress={() =>
              setQueue([...queue, {name: 'Cappuccino', waitTime: 10}])
            }>
            <Text>Cappuccino</Text>
          </Pressable>
          <Pressable
            style={styles.menuButton}
            onPress={() =>
              setQueue([...queue, {name: 'Espresso', waitTime: 15}])
            }>
            <Text>Espresso</Text>
          </Pressable>
        </View>
        <Text style={styles.headerText}>The Barista</Text>
        {currentOrder ? (
          <Text>{currentOrder.name ? currentOrder.name : ''}</Text>
        ) : (
          <Text>{'The Barista is not making an order'}</Text>
        )}
        <Text style={styles.headerText}>The Coffee Counter</Text>
        {readyOrders.length ? (
          <Text>{readyOrders[0].name}</Text>
        ) : (
          <Text>{'The Counter is Empty'}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lighter,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {fontSize: 24, marginTop: 24},
  titleText: {fontSize: 36},
  menuButton: {
    backgroundColor: '#6f4e37',
    margin: 8,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
  },
});

export default App;
