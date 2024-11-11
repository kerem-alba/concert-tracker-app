import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useEffect } from "react";
import { ConcertWithDetails } from "../types/types";
import { getAllConcertsWithArtistInfo } from "../api/concertsApi";
import { filterConcerts } from "@/services/concertService";
import ExploreConcertsInfoBox from "@/components/ExploreConcertsInfoBox";
import { genreMappings } from "@/constants/genres";
import { SafeAreaView } from "react-native-safe-area-context";
import UserHeader from "@/components/UserHeader";

export default function ExploreConcertsScreen() {
  const [concerts, setConcerts] = useState<ConcertWithDetails[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>(["Tüm"]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["Tüm"]);
  const [selectedDate, setSelectedDate] = useState("Tüm");
  const [selectedCustomDate, setSelectedCustomDate] = useState<Date | null>(null);
  const [filteredConcerts, setFilteredConcerts] = useState<ConcertWithDetails[]>([]);
  const [visibleConcertCount, setVisibleConcertCount] = useState(8);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchConcerts = async () => {
      const concertsData = await getAllConcertsWithArtistInfo();
      setConcerts(concertsData);
      setFilteredConcerts(concertsData);
    };
    fetchConcerts();
  }, []);

  useEffect(() => {
    setFilteredConcerts(filterConcerts(concerts, selectedCities, selectedGenres, selectedDate, selectedCustomDate));
    setVisibleConcertCount(8);
  }, [concerts, selectedCities, selectedGenres, selectedDate, selectedCustomDate]);

  const loadMoreConcerts = () => {
    setVisibleConcertCount((prevCount) => prevCount + 8);
  };

  const toggleCity = (city: string) => {
    setSelectedCities((prevCities) => {
      let updatedCities;

      if (city === "Tüm") {
        updatedCities = prevCities.includes("Tüm") ? [] : ["Tüm"];
      } else if (city === "İstanbul") {
        updatedCities = prevCities.includes("İstanbul")
          ? prevCities.filter((c) => c !== "İstanbul" && c !== "İstanbul Avrupa" && c !== "İstanbul Anadolu")
          : [...prevCities.filter((c) => c !== "Tüm"), "İstanbul", "İstanbul Avrupa", "İstanbul Anadolu"];
      } else {
        updatedCities = prevCities.includes(city) ? prevCities.filter((c) => c !== city) : [...prevCities.filter((c) => c !== "Tüm"), city];
      }

      return updatedCities.length === 0 ? ["Tüm"] : updatedCities;
    });
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prevGenres) => {
      let updatedGenres;

      if (genre === "Tüm") {
        updatedGenres = prevGenres.includes("Tüm") ? [] : ["Tüm"];
      } else {
        updatedGenres = prevGenres.includes(genre) ? prevGenres.filter((g) => g !== genre) : [...prevGenres.filter((g) => g !== "Tüm"), genre];
      }

      return updatedGenres.length === 0 ? ["Tüm"] : updatedGenres;
    });
  };

  const toggleDate = (date: string) => {
    setSelectedDate(date);
    if (date === "Tarih Seç") {
      setShowDatePicker(true);
    } else {
      setSelectedCustomDate(null);
    }
  };

  const onChangeCustomDate = (event: any, date: Date | undefined) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedCustomDate(date);
    }
  };

  const cityOptions = ["Tüm", "İstanbul", "Ankara", "Adana"];
  const genreOptions = ["Tüm", ...Object.keys(genreMappings)];
  const dateOptions = ["Tüm", "Bugün", "Bu Hafta", "Bu Ay", "Tarih Seç"];

  return (
    <SafeAreaView style={styles.container}>
      <UserHeader />
      <View style={styles.gridContainer}>
        <View style={styles.citySelection}>
          {cityOptions.map((city) => (
            <TouchableOpacity key={city} onPress={() => toggleCity(city)}>
              <Text style={[styles.cityText, selectedCities.includes(city) && styles.selectedCityText]}>{city}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.genreSelection}>
          {genreOptions.map((genre) => (
            <TouchableOpacity key={genre} onPress={() => toggleGenre(genre)}>
              <Text style={[styles.genreText, selectedGenres.includes(genre) && styles.selectedGenreText]}>{genre}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.dateSelection}>
          {dateOptions.map((date) => (
            <TouchableOpacity key={date} onPress={() => toggleDate(date)}>
              <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>{date}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {showDatePicker && <DateTimePicker value={selectedCustomDate || new Date()} mode="date" display="default" onChange={onChangeCustomDate} />}

        <FlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          data={filteredConcerts.slice(0, visibleConcertCount)}
          numColumns={2}
          renderItem={({ item }) => <ExploreConcertsInfoBox concert={item} />}
          keyExtractor={(item) => item.Id.toString()}
          onEndReached={loadMoreConcerts}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101510",
    paddingTop: 20,
  },
  gridContainer: {
    marginHorizontal: 10,
  },
  citySelection: {
    flexDirection: "row",
    marginVertical: 10,
  },
  cityText: {
    marginRight: 15,
    fontSize: 14,
    color: "#FF8F00",
    borderWidth: 1,
    borderColor: "#FF8F00",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  genreSelection: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 3,
  },
  genreText: {
    marginRight: 10,
    fontSize: 14,
    color: "#06D001",
    borderWidth: 1,
    borderColor: "#06D001",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 3,
  },
  dateSelection: {
    flexDirection: "row",
    marginVertical: 5,
  },
  dateText: {
    marginRight: 10,
    fontSize: 14,
    color: "#1A73E8",
    borderWidth: 1,
    borderColor: "#1A73E8",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 3,
  },
  selectedGenreText: {
    fontWeight: "bold",
    color: "#101510",
    backgroundColor: "#06D001",
  },
  selectedCityText: {
    fontWeight: "bold",
    color: "#101510",
    backgroundColor: "#FF8F00",
  },
  selectedDateText: {
    fontWeight: "bold",
    color: "#101510",
    backgroundColor: "#1A73E8",
  },
});
