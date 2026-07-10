import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import ListEmptyComponent from '@components/common/ListEmptyComponent';
import ScreenContainer from '@components/layout/ScreenContainer';
import HomeService from '@api/service/HomeService';
import { HomeItem } from '@api/models/response';
import { BottomTabScreenProps } from '@navigation/types';
import DashboardListItem from './components/DashboardListItem';
import DashboardHeaderButton from './components/DashboardHeaderButton';

const renderHeaderButton = () => <DashboardHeaderButton />;

const DashboardScreen: React.FC<BottomTabScreenProps<'DashboardScreen'>> = ({
  navigation,
}) => {
  const [items, setItems] = useState<HomeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: renderHeaderButton,
      headerRight: renderHeaderButton,
    });
  }, [navigation]);

  const loadData = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const data = await HomeService.getData();
      setItems(data);
    } catch {
      setItems([]);
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(() => loadData(true), [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ScreenContainer>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <DashboardListItem item={item} />}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <ListEmptyComponent loading={loading} message="No data available" />
        }
      />
    </ScreenContainer>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
});
