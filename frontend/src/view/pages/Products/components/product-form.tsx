import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import {
  currencyStringToNumber,
  transformPriceFloatToString,
} from '../../../../app/lib/utils';
import { productsService } from '../../../../app/services/productsService';
import { ProductResponse } from '../../../../app/services/productsService/getAll';
import { Heading } from '../../../components/heading';
import { Button } from '../../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { InputCurrency } from '../../../components/ui/input-currency';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';

interface ProductFormProps {
  initialData?: ProductResponse;
  categories: Array<{ id: string; name: string }>;
  onSubmit?: () => void;
}

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  color: z.string().min(1),
  price: z.string().min(1),
  categoryId: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export function ProductForm({
  initialData,
  categories,
  onSubmit,
}: ProductFormProps) {
  const navigate = useNavigate();

  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: transformPriceFloatToString(initialData.price),
        }
      : {
          name: '',
          description: '',
          color: '',
          price: '',
        },
  });

  const queryClient = useQueryClient();

  const { isPending: isLoadingCreate, mutateAsync: createProduct } =
    useMutation({
      mutationFn: productsService.create,
    });

  const { isPending: isLoadingUpdate, mutateAsync: updateProduct } =
    useMutation({
      mutationFn: productsService.update,
    });

  const isSubmitting = isLoadingCreate || isLoadingUpdate;

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const formatedProductWithPrice = {
        ...data,
        price: currencyStringToNumber(data.price),
      };

      if (initialData) {
        await updateProduct({
          ...formatedProductWithPrice,
          id: initialData.id,
        });
      } else {
        await createProduct(formatedProductWithPrice);
      }

      onSubmit?.();
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });

      navigate('/products');
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong');
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
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
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}
