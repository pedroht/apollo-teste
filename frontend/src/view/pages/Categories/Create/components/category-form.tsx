import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { currencyStringToNumber } from "@/app/lib/utils";
import { categoriesService } from "@/app/services/categoriesService";
import { Heading } from "@/view/components/heading";
import { Button } from "@/view/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import { InputPercentage } from "@/view/components/ui/input-percentage";

const schema = z.object({
  name: z.string().min(1),
  discount: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export function CategoryForm() {
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      discount: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await categoriesService.create({
        name: data.name,
        discount: currencyStringToNumber(data.discount),
      });

      navigate("/categories");
      toast.success("Category Created");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Heading title="Create Category" description="Add a new category" />
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="w-full space-y-8">
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormDescription>Insert the discount percentage to this category (0-100)%</FormDescription>
                  <FormControl>
                    <InputPercentage value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isSubmitting} className="ml-auto" type="submit">
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
