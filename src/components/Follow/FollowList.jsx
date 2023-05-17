import { followDelete, followList } from 'components/axios/users';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import FollowItem from './FollowItem';

const FollowList = () => {

  const { data } = useQuery("followList",followList);

  console.log('나는 친구추가된 data',data)
  return (
    <div className='mr-3 my-3 w-70'>
      <p className='text-xl font-bold leading-6 text-gray-900 my-1'>
        친구 목록
      </p>
      <ul>
        {/* {data?.map((item) => (
          <FollowItem key={item.user_id} data={item} /> *1
        ))} */}
      </ul>
    </div>
  );
};

export default FollowList;
