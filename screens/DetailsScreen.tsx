import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

export default function DetailsScreen() {
  const [profile, setProfile] = useState<any>(null);

  return (
    <View>
      <Text>DetailsScreen</Text>
      <Text>{profile?.display_name}</Text>
    </View>
  );
}
