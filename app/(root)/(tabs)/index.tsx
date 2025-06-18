import { useGlobalContext } from "@/app/lib/global-provider";
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
import { useAppwrite } from "@/app/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/app/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Index() {
  const { user } = useGlobalContext();

  const Params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: Params.filter!,
      query: Params.query!,
      limit: 6,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: Params.filter!,
      query: Params.query!,
      limit: 6,
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
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-sm font-rubik text-black-100">
                    Good morning,{" "}
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between mb-4">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>




{/* Featured properties section, FeaturedCard */}


              {latestPropertiesLoading ? 
                <ActivityIndicator size="large" className="text-primary-300" /> : 
                !latestProperties || latestProperties.length === 0 ? <NoResults /> : (

                  // if leatest properties are loading, then show the ActivityIndicator 
                  // : else if no latestProperties or || latestProperties.length is triple === 0
                  // ? then render <NoResult /> but : else render the <FlatList />
  
              <FlatList
                data={latestProperties}
                renderItem={({ item }) => (
                  <FeaturedCard
                    item={item}
                    onPress={() => handleCardPress(item.$id)}
                  />
                )}
                keyExtractor={(item) => item.$id}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 ml-5"
              />
            )}
            </View>

            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">
                Our Recommendation
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
}
