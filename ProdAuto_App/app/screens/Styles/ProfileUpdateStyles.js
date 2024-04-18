import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  navButton: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  navButtonText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  
});

export default styles;
