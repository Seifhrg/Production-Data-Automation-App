import { StyleSheet,Platform } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fa',
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
   
  },
  container2: {
    flex: 1,
    
    backgroundColor: "#f0f4f8",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cardTouchable: {
    width: "90%",
    borderRadius: 10,
  },
  card: {
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradient: {
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  cardCount: {
    fontSize: 18,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 150,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalCard: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
  },
  totalCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalCardCount: {
    fontSize: 16,
    color: "#666",
  },
  
});
export default styles;