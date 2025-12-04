import { FlatList, StyleSheet, Text, View } from 'react-native';

export const CommentList = ({ comments }: { comments: any[] }) => {
  return (
    <FlatList
      data={comments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View
          style={[
            styles.commentSection,
            item.authorRole === 'child' ? styles.child : styles.parent,
          ]}
        >
          <Text>{item.authorName}</Text>
          <Text>{item.message}</Text>
          <Text>{new Date(item.createdAt).toLocaleTimeString()}</Text>
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  commentSection: {
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
  },
  child: { backgroundColor: '#e6f2ff', alignSelf: 'flex-start' },
  parent: { backgroundColor: '#fce5cd', alignSelf: 'flex-end' },
});
