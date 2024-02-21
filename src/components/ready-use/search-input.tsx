import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Search, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { searchSchema } from "~/schema";

import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

export function SearchInput({ className }: { className?: string }) {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '' //jika tidak dikasi maka akan error dari undefined ke string
    }
  });

  const [isInputFilled, setInputFilled] = useState(false);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputFilled(e.target.value !== "");
    form.setValue("search", e.target.value)
  }

  function onClearInput() {
    form.reset({search: ""});
    setInputFilled(false);
  }

  function onSubmit(values: z.infer<typeof searchSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
        <div className="relative">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Cari barang"
                    {...field}
                    onChange={onInputChange}
                    className="placeholder:text-[16px] text-[16px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isInputFilled && (
            <button
              type="button"
              className="absolute right-10 bottom-3"
              onClick={onClearInput}
            >
              <X className="text-gray" />
            </button>
          )}
          <button type="submit" className="absolute right-3 bottom-4">
            <Search className="text-gray" size={16} />
          </button>
        </div>
      </form>
    </Form>
  );
}
