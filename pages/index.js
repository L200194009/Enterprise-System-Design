import Head from 'next/head';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { StraightLine, ReducingBalance, SumOfTheYear, UnitOfActivity } from '../components/depreciation';

export default function Home() {
  const tabContents = [StraightLine, ReducingBalance, SumOfTheYear, UnitOfActivity];

  return (
    <div>
      <Head>
        <title>Depreciation Calculator</title>
      </Head>
      
      <h1 className="text-3xl font-medium mb-8">Depreciation Calculator</h1>
      
      <Tabs>
        <TabList className="md:flex rounded overflow-hidden border border-white divide-y md:divide-x md:divide-y-0 mb-10">
          <Tab className="flex-1 py-2 px-4 border-white cursor-pointer text-xl focus:outline-0" selectedClassName="bg-[#61dafb] text-gray-800">Straight Line</Tab>
          <Tab className="flex-1 py-2 px-4 border-white cursor-pointer text-xl focus:outline-0" selectedClassName="bg-[#fb61dd] text-gray-800">Reducing Balance</Tab>
          <Tab className="flex-1 py-2 px-4 border-white cursor-pointer text-xl focus:outline-0" selectedClassName="bg-[#eefb61] text-gray-800">Sum of The Year</Tab>
          <Tab className="flex-1 py-2 px-4 border-white cursor-pointer text-xl focus:outline-0" selectedClassName="bg-[#61fbc0] text-gray-800">Unit of Activity</Tab>
        </TabList>

        {tabContents.map((Component, i) => (
          <TabPanel key={i}>
            <Component />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  )
}
