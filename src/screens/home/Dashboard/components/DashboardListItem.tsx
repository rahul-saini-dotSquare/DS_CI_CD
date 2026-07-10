import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '@theme/Colors';
import Style from '@constants/Style';
import { HomeItem } from '@api/models/response';

interface DashboardListItemProps {
  item: HomeItem;
}

const DashboardListItem: React.FC<DashboardListItemProps> = ({ item }) => {
  return <Text style={styles.item}>{item.title}</Text>;
};

export default memo(DashboardListItem);

const styles = StyleSheet.create({
  item: {
    ...Style.getTextStyle(15, 'Regular', Colors.black),
    paddingVertical: 8,
  },
});
