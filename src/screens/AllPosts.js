import { View, Text, ScrollView, StyleSheet } from "react-native";
import Post from "../components/Post";

function AllPosts() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Post
        username={"Aristóteles"}
        text={"El humano es un animal político."}
        numLikes={2}
      />
      <Post
        username={"Socrates"}
        text={"No puedo enseñar nada a nadie, lo único que puedo hacer es hacerles pensar."}
        numLikes={2}
      />
      <Post
        username={"MarcoAurelio"}
        text={"No te preguntes como debe ser una buena persona, sé una."}
        numLikes={0}
      />
      <Post
        username={"Dussel"}
        text={"Yo no soy comentarista de los filosofos norteamericanos o europeos, pienso con mi cabeza latinoamericana, nuestra filosofia."}
        numLikes={0}
      />
    </ScrollView>
  );
}

export default AllPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  }
});
