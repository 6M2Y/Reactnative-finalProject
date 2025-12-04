
//reusable hook
import { useEffect, useState } from 'react';
import { getFamilyMembers } from '../api/userApi';


//fetch children of the family using familycode
export const useFamilyMembers = (familyCode?: string) => {
    
    const [members, setMembers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState<string |null>(null)

    useEffect(() => {
        const fillMembers = async () => {
          try {
            if (!familyCode) return;
            const members = await getFamilyMembers(familyCode);
            //filter only children
            setMembers(
              members.data.filter((member: any) => member.role === 'child'),
            );
            
          } catch (error: any) {
            setErr(error.message);
          } finally {
            setLoading(false);
          }
        };
        fillMembers();
      }, [familyCode]);
    
    return {loading, members, err}
}

 
