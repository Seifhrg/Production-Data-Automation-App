import { StyleSheet,Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fa',
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
  },
  navIcon: {
   paddingTop:30
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',  // Adjusted to match "Add Profile"
    paddingVertical: 20,           // Adjusted for consistent vertical padding
    backgroundColor: '#ffffff',    // Ensured background color matches
  },
 
  navBarTitle: {
    paddingTop:30,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between', // Adjusted to space out content and button
  },
  deleteIcon: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#FFF', // Optional: can adjust for different visual feedback
  },
  cardTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  userType: {
    fontSize: 14,
    color: '#999',
  },
  actionIcon: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#e2e2e2',
  },
  listContainer: {
    paddingVertical: 20,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 6,
  },
});
export default styles;
