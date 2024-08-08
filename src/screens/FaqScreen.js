import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "react-native-vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

const FAQScreen = () => {
  const navigation = useNavigation();

  const [faqs, setFaqs] = useState([]);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  useEffect(() => {
    const fetchFaqs = () => {
      firestore()
        .collection("faqs")
        .get()
        .then((snapshot) => {
          const faqsData = snapshot.docs.map((doc) => doc.data());
          setFaqs(faqsData);
        })
        .catch((error) => {
          console.log("Error fetching FAQs:", error);
        });
    };

    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with back button, movie title, and share button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="angle-left" size={24} color="#dc3558" />
        </TouchableOpacity>
        <Text style={styles.title}>Your most ask questions</Text>
      </View>

      <View style={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity
              onPress={() => toggleFAQ(index)}
              style={styles.questionContainer}
            >
              <Text style={styles.questionText}>{faq.question}</Text>
              <Icon
                name={expandedFAQ === index ? "chevron-up" : "chevron-down"}
                style={styles.icon}
              />
            </TouchableOpacity>
            {expandedFAQ === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  faqContainer: {
    marginBottom: 15,
    marginTop: 20,
  },
  faqItem: {
    marginBottom: 20,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 5,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 18,
  },
  answerContainer: {
    backgroundColor: "#e1e1e1",
    padding: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  answerText: {
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  backButton: {
    padding: 5,
    color: "#dc3558",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 10,
  },
});

export default FAQScreen;
