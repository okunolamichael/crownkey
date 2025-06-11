import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Text className="font-bold my-10 font-rubik text-2xl">Welcome to Crownkey Real Esate</Text>
      <Link href="/signIn">
        <Text>Sign In</Text>
      </Link>
      <Link href="/explore">
        <Text>Explore</Text>
      </Link>
      <Link href="/profile">
        <Text>Profile</Text>
      </Link>
      <Link href="/properties/1">
        <Text>Property</Text>
      </Link>
    </View>
  );
}
