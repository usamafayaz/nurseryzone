import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {StripeProvider} from '@stripe/stripe-react-native';
import {STRIPE_PUBLISH_KEY} from './src/config/stripeKey';

const App = () => {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISH_KEY}>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </Provider>
    </StripeProvider>
  );
};

export default App;
