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

      <Text className="font-bold text-lg my-10">Welcome to crownkey real esate company</Text>
      <Link href="/signIn">
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Sign In</Text>
      </Link>
      <Link href="/explore">
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Explore</Text>
      </Link>
      <Link href="/profile">
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Profile</Text>
      </Link>
      <Link href="/properties/1">
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Property</Text>
      </Link>
    </View>
  );
}
