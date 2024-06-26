import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/WorkOrderListStyles";
import CircleAvatar from "../CircleAvatar";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "@env";
import { useAuthStore } from "../../providers/AuthProvider";

const ListArticles = ({ navigation }) => {
  const { token } = useAuthStore();
  const workOrder = useSelector((state) => state.workOrders.selectedWorkOrder); // retrieve the selected workOrder from the store
  console.log("from redux", workOrder);
  if (!workOrder) {
    // handle the case where workOrder is null
    Alert.alert("Error", "No work order selected.");
    navigation.goBack();
    return null;
  }
  console.log(workOrder, "from article list ");
  const [ArticleData, setArticleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllArticleRelatedData = async () => {
    try {
      const res = await axios.get(`http://${API_URL}/work-order-parts-list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filteredData = res.data.filter(
        (data) => data.numOF === workOrder.DOCO
      );
      console.log("filtered", filteredData);
      setArticleData(filteredData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getAllArticleRelatedData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navButton}
        >
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Articles List </Text>
      </View>

      <FlatList
        data={ArticleData}
        keyExtractor={(item) => item.UKID.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UpdateArticle", {
                  numOF: workOrder.DOCO,
                  article: item,
                  refresh: getAllArticleRelatedData,
                })
              }
              style={styles.cardTouchable}
            >
              <CircleAvatar ukid={item.UKID} />
              <View style={styles.cardDetails}>
                <Text style={styles.documentType}>{item.description}</Text>
                <Text style={styles.quantityOrdered}>
                  Quantity Ordered: {item.quantityOrdered}
                </Text>
                <Text style={styles.statusCode}>
                  issuedQuantity: {item.issuedQuantity}
                </Text>
                <Text style={styles.requestedDate}>
                  Quantity Canceled : {item.quantityCanceled}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("AddArticle", {
            numOF: workOrder.DOCO,
            refresh: getAllArticleRelatedData,
          })
        }
      >
        <Icon name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default ListArticles;
