import dayjs from "dayjs";
import { RiAdminFill } from "react-icons/ri";
import relativeTime from "dayjs/plugin/relativeTime";

import type { User } from "../../../types/auth.types";
import type { JobStats } from "../../../types/job.types";
import type { PlatformStats } from "../../admin/services/adminService";

dayjs.extend(relativeTime);

interface Props {
  isAdmin: boolean;
  user: User | null;
  stats: JobStats | null;
  platform: PlatformStats | null;
}

function WelcomeBanner({ isAdmin, user, stats, platform }: Props) {
  return (
    <div
      className='rounded-2xl py-7 px-4 mb-4'
      style={{
        background: "linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)",
      }}
    >
      <h2 className='text-xl font-bold pb-1 text-white flex items-center gap-1.5'>
        Welcome back,
        <span className='capitalize inline-flex items-center gap-1'>
          {isAdmin ? (
            <>
              <RiAdminFill size={20} />
              Admin
            </>
          ) : (
            user?.name
          )}
        </span>
      </h2>

      <p className='text-sm text-gray-100 flex items-center gap-1'>
        <span>{dayjs().format("dddd, MMMM D, YYYY")} ·</span>
        {isAdmin ? (
          <span>
            <span className='text-[15px] font-bold'>
              {platform?.totalUsers ?? 0}
            </span>{" "}
            users on the platform
          </span>
        ) : (
          <span>
            <span className='text-[15px] font-bold'>
              {stats?.thisWeek ?? 0}
            </span>{" "}
            applications this week
          </span>
        )}
      </p>
    </div>
  );
}

export default WelcomeBanner;
