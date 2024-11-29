// src/screens/Reviews.js
import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import Card from '../../../components/Card';
import {DUMMY_REVIEWS} from '../../../utils/dummyData';
import {appTheme} from '../../../config/constants';

const Reviews = () => {
  const renderReview = ({item}) => (
    <Card>
      <View style={styles.reviewHeader}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.plantName}>Plant: {item.plantName}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Rating:</Text>
        <Text style={styles.rating}>{'⭐'.repeat(item.rating)}</Text>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_REVIEWS}
        keyExtractor={item => item.id.toString()}
        renderItem={renderReview}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.primaryBackground,
    paddingVertical: 10,
  },
  list: {
    paddingBottom: 20,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  customerName: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
  },
  date: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    color: appTheme.colors.secondaryText,
  },
  plantName: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    color: appTheme.colors.secondaryText,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    color: appTheme.colors.secondaryText,
    marginRight: 5,
  },
  rating: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.accent,
  },
  comment: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    color: appTheme.colors.primaryText,
    marginTop: 10,
  },
});

export default Reviews;
