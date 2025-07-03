import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link, router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import { FeaturedCard, Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Explore() {

  const Params = useLocalSearchParams<{ query?: string; filter?: string }>();


  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: Params.filter!,
      query: Params.query!,
      limit: 20,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: Params.filter!,
      query: Params.query!,
      limit: 20,
    });
  }, [Params.filter, Params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      {/*
        In your code, the main FlatList is the root of your screen 
        and is responsible for rendering the "Our Recommendation" cards.
        The ListHeaderComponent prop allows you to render any React 
        element above the main list items (i.e., above the cards rendered by renderItem).
        Inside your ListHeaderComponent, you placed the "Featured" section, 
        which itself contains another FlatList for featured cards. 
       */}
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : <NoResults />
        }
        ListHeaderComponent={
          <View className="px-5">

            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="tex-base mr-2 text-center font-Rubik-medium text-black-300">
                Search for your Ideal home
              </Text>

              <Image source={icons.bell} className="w-6 h-6" />
            </View>
            <Search />

            <View className="mt-5">
              <Text className="text-xl font-Rubik-bold text-black-300 mt-5">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
