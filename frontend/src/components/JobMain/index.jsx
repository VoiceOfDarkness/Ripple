import JobCardsList from "../JobCards/JobCardsList";
import JobHeader from "../JobHeader/JobHeader";

export default function JobMain() {
  const jobs = [
    {
      id: 1,
      img: "https://picsum.photos/seed/picsum/200/300",
      title: "Frontend Developer",
      company: "Photosnap",
      location: "Remote",
      type: "Full Time",
      logo: "photosnap",
      isNew: true,
      isFeatured: true,
      postedAt: "1d ago",
      contract: "Full Time",
      cost: 100,
    },
    {
      id: 2,
      title: "Full Stack Developer",
      img: "https://picsum.photos/seed/picsum/200/300",
      company: "Manage",
      location: "Remote",
      type: "Part Time",
      logo: "manage",
      isNew: true,
      isFeatured: true,
      postedAt: "1d ago",
      contract: "Part Time",
      cost: 100,
    },
    {
      id: 3,
      title: "Junior Frontend Developer",
      img: "https://picsum.photos/seed/picsum/200/300",
      company: "Account",
      location: "USA only",
      type: "Part Time",
      logo: "account",
      isNew: true,
      isFeatured: false,
      postedAt: "2d ago",
      contract: "Part Time",
      cost: 100,
    },
    {
      id: 4,
      title: "Junior Frontend Developer",
      img: "https://picsum.photos/seed/picsum/200/300",
      company: "MyHome",
      location: "USA only",
      type: "Part Time",
      logo: "myhome",
      isNew: false,
      isFeatured: false,
      postedAt: "5d ago",
      contract: "Part Time",
      cost: 100,
    },
    {
      id: 5,
      title: "Junior Frontend Developer",
      img: "https://picsum.photos/seed/picsum/200/300",
      company: "Loop Studios",
      location: "Worldwide",
      type: "Full Time",
      logo: "loop-studios",
      isNew: false,
      isFeatured: false,
      postedAt: "1w ago",
      contract: "Full Time",
      cost: 100,
    },
  ];
  return (
    <div>
      <JobHeader />
      <JobCardsList jobs={jobs} />
    </div>
  );
}
