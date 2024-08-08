import firestore from "@react-native-firebase/firestore";

async function seedFirbaseData() {
  const faqCollection = firestore().collection("faqs");

  // FAQ data to be added
  const faqs = [
    {
      question: "What is the refund policy?",
      answer: "Tickets are non-refundable.",
    },
    {
      question: "How can I contact support?",
      answer: "You can contact support via email at support@example.com.",
    },
    {
      question: "Where can I find my booking history?",
      answer:
        "Your booking history can be found in the 'Bookings' section of the app.",
    },
    {
      question: "Can I change my booking details?",
      answer:
        "Booking details can be changed up to 24 hours before the movie start time.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit cards, debit cards, and PayPal.",
    },
    {
      question: "Is there a minimum age requirement for booking?",
      answer:
        "There is no minimum age requirement, but some movies may have age restrictions.",
    },
    {
      question: "Can I book tickets for a group?",
      answer:
        "Yes, you can book tickets for a group. Please select the number of tickets when booking.",
    },
    {
      question: "What should I do if I lose my ticket?",
      answer:
        "If you lose your ticket, please contact our support team for assistance.",
    },
    {
      question: "Are there any discounts available?",
      answer:
        "We offer discounts for students, seniors, and military personnel. Check the 'Offers' section for more details.",
    },
    {
      question: "Can I get a refund if the movie is canceled?",
      answer:
        "If the movie is canceled, you will receive a full refund automatically.",
    },
  ];

  // Add FAQ items
  for (const item of faqs) {
    try {
      await faqCollection.add({
        question: item.question,
        answer: item.answer,
      });
      console.log(`FAQ added successfully: ${item.question}`);
    } catch (error) {
      console.error(`Error adding FAQ: ${item.question}`, error);
    }
  }
}

export default seedFirbaseData;
