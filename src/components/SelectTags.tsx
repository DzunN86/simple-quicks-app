import BookmarksIcon from "@/components/Icon/BookmarksIcon";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TagsOption } from "@/constans";
import { cn } from "@/lib/utils";

interface SelectTagsProps {
  tags: string[];
  setTags: (tags: string) => void;
}

export default function SelectTags({ tags, setTags }: SelectTagsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-5 bg-gray-50 py-2 px-4 ms-3 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
          <BookmarksIcon className={cn(tags?.length ? "fill-primary" : "fill-primary-gray-light")} />
          <div className="flex gap-2 flex-wrap">
            {TagsOption.filter((tag) => tags.includes(tag.value)).map((tag) => (
              <span key={tag.value} className={cn("text-sm rounded-md px-3 py-1.5 font-bold", tag.bg)}>
                {tag.value}
              </span>
            ))}
            {!tags.length && <span className="text-sm text-primary-gray-light px-3 py-1.5 ">Add tags</span>}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 flex flex-col gap-2 p-3" align="start">
        {TagsOption.map((tag) => (
          <DropdownMenuCheckboxItem
            key={tag.value}
            className={cn("font-medium text-primary-gray cursor-pointer", tag.bg)}
            checked={tags.includes(tag.value)}
            onSelect={(e) => {
              e.preventDefault()
              setTags(tag.value)
            }}
            // onCheckedChange={() => setTags(tag.value)}
          >
            {tag.value}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
