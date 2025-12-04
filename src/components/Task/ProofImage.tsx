import { Image, StyleSheet, Text, View } from 'react-native';

export const ProofImage = ({ uri }: any) => {
  return (
    <View style={{ marginVertical: 12 }}>
      <Text style={{ fontWeight: 'bold' }}>Uploaded Proof:</Text>
      <Image source={{ uri }} style={styles.imgStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  imgStyle: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});
