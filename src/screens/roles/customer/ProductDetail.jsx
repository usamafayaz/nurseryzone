import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {appTheme} from '../../../config/constants';
import {API_BASE_URL} from '../../../utils/apiConfig';

const ProductDetail = ({route, navigation}) => {
  const {plant} = route.params || {};
  const [reviews, setReviews] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/feedback/?plant_id=${plant.plant_id}`,
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

  const handleAddToCart = () => {
    // Add your cart logic here
    navigation.navigate('CartScreen');
  };

  if (!plant) {
    return (
      <View style={styles.centerContainer}>
        <Text>No plant selected</Text>
      </View>
    );
  }

  const ReviewCard = ({review}) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerIcon}>
          <Icon name="person" size={24} color={appTheme.colors.primary} />
        </View>
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{review.name}</Text>
          <Text style={styles.reviewDate}>
            {new Date(review.created_at).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <View style={styles.reviewContent}>
        <Icon
          name="format-quote"
          size={20}
          color={appTheme.colors.secondary}
          style={styles.quoteIcon}
        />
        <Text style={styles.reviewText}>{review.comment}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: `${API_BASE_URL}${plant.image_url}`}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{plant.name}</Text>
        <Text style={styles.description}>{plant.description}</Text>
        <Text style={styles.price}>Rs. {plant.price}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() =>
              setSelectedQuantity(Math.max(1, selectedQuantity - 1))
            }
            style={styles.quantityButton}>
            <Icon name="remove" size={24} color={appTheme.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{selectedQuantity}</Text>
          <TouchableOpacity
            onPress={() => setSelectedQuantity(selectedQuantity + 1)}
            style={styles.quantityButton}>
            <Icon name="add" size={24} color={appTheme.colors.primary} />
          </TouchableOpacity>
        </View>

        {plant.stock < 15 && plant.stock !== 0 && (
          <Text style={styles.stockWarning}>Only a few items are left!</Text>
        )}

        <TouchableOpacity
          onPress={handleAddToCart}
          disabled={plant.stock < selectedQuantity}
          style={[
            styles.addToCartButton,
            plant.stock < selectedQuantity && styles.disabledButton,
          ]}>
          <Text style={styles.addToCartText}>
            {plant.stock === 0
              ? 'Out of Stock'
              : plant.stock < selectedQuantity
              ? 'Stock is less than selected quantity'
              : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reviewsSection}>
        <View style={styles.reviewsHeader}>
          <Icon name="chat" size={24} color={appTheme.colors.primary} />
          <Text style={styles.reviewsTitle}>Customer Experiences</Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={appTheme.colors.primary}
            style={styles.loader}
          />
        ) : reviews.length > 0 ? (
          reviews.map(review => (
            <ReviewCard key={review.order_id} review={review} />
          ))
        ) : (
          <View style={styles.noReviews}>
            <Icon
              name="chat-bubble-outline"
              size={48}
              color={appTheme.colors.secondary}
            />
            <Text style={styles.noReviewsText}>No experiences shared yet</Text>
            <Text style={styles.noReviewsSubtext}>
              Be the first to share your thoughts about this beautiful plant!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.primaryBackground,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: appTheme.screen.height * 0.4,
    backgroundColor: appTheme.colors.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: appTheme.fontSizes.xlarge,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginBottom: 8,
  },
  description: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.secondaryText,
    marginBottom: 16,
  },
  price: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primary,
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: appTheme.colors.secondaryBackground,
    padding: 8,
    borderRadius: 20,
  },
  quantity: {
    color: appTheme.colors.primaryText,
    fontSize: appTheme.fontSizes.large,
    marginHorizontal: 20,
  },
  stockWarning: {
    color: appTheme.colors.error,
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: appTheme.colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: appTheme.colors.border,
  },
  addToCartText: {
    color: 'white',
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
  },
  reviewsSection: {
    padding: 20,
    backgroundColor: appTheme.colors.secondaryBackground,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewsTitle: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginLeft: 8,
  },
  reviewCard: {
    backgroundColor: appTheme.colors.primaryBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: appTheme.colors.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
  },
  reviewDate: {
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.secondaryText,
  },
  reviewContent: {
    paddingLeft: 24,
  },
  quoteIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  reviewText: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.secondaryText,
    fontStyle: 'italic',
  },
  noReviews: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: appTheme.colors.primaryBackground,
    borderRadius: 12,
  },
  noReviewsText: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginTop: 16,
    marginBottom: 8,
  },
  noReviewsSubtext: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.secondaryText,
    textAlign: 'center',
  },
  loader: {
    padding: 20,
  },
});

export default ProductDetail;
