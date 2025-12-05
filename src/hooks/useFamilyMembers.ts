
//reusable hook
import { useCallback, useEffect, useState } from 'react';
import { getFamilyMembers } from '../api/userApi';
import { useFocusEffect } from '@react-navigation/native';


//fetch children of the family using familycode
export const useFamilyMembers = (familyCode?: string) => {
    
    const [members, setMembers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState<string |null>(null)

   const fetchMembers = useCallback(async () => {
    try {
      if (!familyCode) return;
      setLoading(true);

      const res = await getFamilyMembers(familyCode);

      setMembers(res.data.filter((m: any) => m.role === 'child'));
    } catch (error: any) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }, [familyCode]);

  // Fetch on mount + whenever familyCode changes
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Fetch every time user navigates back to this screen
  useFocusEffect(
    useCallback(() => {
      fetchMembers();
    }, [fetchMembers])
  );

  return { loading, members, err};
}

 
