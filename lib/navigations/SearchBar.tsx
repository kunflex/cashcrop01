import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  search: string;
  setSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search-outline" size={20} color="#777" />
      <TextInput
        placeholder="Search plants..."
        placeholderTextColor="#777"
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: '#333',
  },
});
