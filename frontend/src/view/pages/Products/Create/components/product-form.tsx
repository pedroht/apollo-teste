import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { currencyStringToNumber } from "@/app/lib/utils";
import { productsService } from "@/app/services/productsService";
import { Heading } from "@/view/components/heading";
import { Button } from "@/view/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import { InputCurrency } from "@/view/components/ui/input-currency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/view/components/ui/select";
import { Textarea } from "@/view/components/ui/textarea";

interface ProductFormProps {
  categories: Array<{ id: string; name: string }>;
}

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  color: z.string().min(1),
  price: z.string().min(1),
  categoryId: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export function ProductForm({ categories }: ProductFormProps) {
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      color: "",
      price: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await productsService.create({
        ...data,
        price: currencyStringToNumber(data.price),
      });

      navigate("/products");
      toast.success("Product Created");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Heading title="Create Product" description="Add a new product" />
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
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Product color"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <InputCurrency
                      onChange={field.onChange}
                      value={field.value}
                    />
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
