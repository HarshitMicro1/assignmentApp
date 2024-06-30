import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {getData, getImage} from './src/res/HelperFunctions';
import {normalizedHeight, normalizedWidth} from './src/res/consts';
import Searchbar from './src/components/Searchbar';
import ListItem from './src/components/ListComponent';

import NoData from './src/components/NoData';

const App = () => {
  const [data, setData] = useState<{title: string; posterUrl: any}[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState<
    {title: string; posterUrl: any}[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const fetchData = async (pageNum: number) => {
    if (loading || endReached) return;
    setLoading(true);
    try {
      let response = await getData(pageNum);
      const newContent = response.page['content-items'].content.map(item => ({
        title: item.name,
        posterUrl: getImage(item?.['poster-image']),
      }));
      setData(prevData => [...prevData, ...newContent]);
      setTitle(response.page.title);
      const totalPages = Math.ceil(
        parseInt(response.page['total-content-items'], 10) /
          parseInt(response.page['page-size-requested'], 10),
      );
      if (pageNum >= totalPages) {
        setEndReached(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    (text: string) => {
      setQuery(text);
      const filtered = data.filter(item =>
        item.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filtered);
    },
    [data],
  );

  const handleEndReached = () => {
    if (!loading && !endReached) {
      setPage(page => page + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        title={title}
        testId="searchbar"
        onChangeText={handleSearch}
        searchData={query}
      />
      <FlatList
        data={filteredData}
        renderItem={({item}) => (
          <ListItem title={item.title} posterUrl={item.posterUrl} />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.list}
        ListFooterComponent={() =>
          loading && (
            <ActivityIndicator
              testID="loading-indicator"
              size="large"
              color="#ffffff"
            />
          )
        }
      />
      {filteredData.length === 0 && <NoData message="No Data Found" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  list: {
    paddingHorizontal: normalizedWidth(10),
    marginTop: normalizedHeight(16),
  },
});

export default App;
