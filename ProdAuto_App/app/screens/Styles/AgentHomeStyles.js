
import { StyleSheet, Platform,Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFF4",
    paddingTop: Platform.OS === "ios" ? 60 : 0,
  },
  scrollView: {
    flex: 1,
  },
  dashboardContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  totalCard: {
    width: width - 40,
    padding: 20,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalCardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  totalCardCount: {
    fontSize: 18,
    color: "#555",
  },
  cardTouchable: {
    width: width - 40,
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: 10,
  },
  card: {
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  gradient: {
    padding: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
    textAlign: "left",
  },
  cardCount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 25,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
export default styles