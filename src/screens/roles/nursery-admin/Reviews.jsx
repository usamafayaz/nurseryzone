import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appTheme} from '../../../config/constants';
import API_BASE_URL from '../../../utils/apiConfig';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const nursery = JSON.parse(userData);

      const response = await fetch(
        `${API_BASE_URL}/feedback/${nursery.user_id}`,
      );

      if (response.ok) {
        const result = await response.json();
        setReviews(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ReviewCard = ({review}) => (
    <View style={styles.card}>
      <View style={styles.cardStrip} />
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.customerName}>{review.name}</Text>
          <Text style={styles.plantName}>Plant: {review['plant name']}</Text>
        </View>
        <Text style={styles.date}>
          {new Date(review.created_at).toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.orderId}>
        <Text style={styles.orderIdLabel}>Order ID: </Text>
        ORD-{String(review.order_id).padStart(4, '0')}
      </Text>

      <View style={styles.commentContainer}>
        <Text style={styles.comment}>{review.comment}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={appTheme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Customer Reviews</Text>
            <Text style={styles.headerSubtitle}>
              View and manage customer feedback
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item, index) => `review-${index}`}
        contentContainerStyle={styles.scrollContent}
        renderItem={({item}) => <ReviewCard review={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No reviews yet</Text>
            <Text style={styles.emptyStateSubtitle}>
              Customer reviews will appear here
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.secondaryBackground,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: appTheme.colors.primary,
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: appTheme.colors.primaryBackground,
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
  },
  headerSubtitle: {
    color: appTheme.colors.secondaryBackground,
    fontSize: appTheme.fontSizes.small,
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: appTheme.colors.primaryBackground,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: appTheme.colors.primary,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  customerName: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
  },
  plantName: {
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.secondaryText,
    marginTop: 2,
  },
  date: {
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.secondaryText,
  },
  orderId: {
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.primaryText,
    marginBottom: 12,
  },
  orderIdLabel: {
    fontFamily: appTheme.fontFamilies.bold,
  },
  commentContainer: {
    backgroundColor: appTheme.colors.secondaryBackground,
    padding: 12,
    borderRadius: 8,
  },
  comment: {
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.primaryText,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyStateTitle: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginTop: 16,
  },
  emptyStateSubtitle: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.secondaryText,
    marginTop: 8,
  },
});

export default Reviews;
