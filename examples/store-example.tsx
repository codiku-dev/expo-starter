import { ProductApi } from "@/api/product-api";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H2 } from "@/components/ui/typography";
import { useProducts } from "@/hooks/product-hook";
import { useProductStore } from "@/store/product/product-store";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { ScrollView, View } from "react-native";

export function StoreExample() {
    const { selectedProduct, setSelectedProduct } = useProductStore();

    const {
        data: products,
        isLoading: isLoadingProducts,
        error: productsError,
        refetch: refetchProducts
    } = useProducts();

    const {
        data: product,
        isLoading: isLoadingProduct,
        error: productError,
        refetch: refetchProduct
    } = useQuery({
        queryKey: ['product', selectedProduct?.id],
        queryFn: () => selectedProduct ? ProductApi.fetchProductById(selectedProduct.id) : null,
        enabled: !!selectedProduct
    });

    if (isLoadingProducts) {
        return (
            <View className="items-center justify-center flex-1">
                <Text>Loading products...</Text>
            </View>
        );
    }

    if (productsError) {
        return (
            <View className="gap-4">
                <Text className="text-destructive">Failed to load products</Text>
                <Button onPress={() => refetchProducts()}>
                    <Text>Retry</Text>
                </Button>
            </View>
        );
    }
    return (
        <View className="gap-4">
            <H2>Products Store Example (Persistent)</H2>

            {selectedProduct ? (
                <View className="gap-4">
                    <Button onPress={() => setSelectedProduct(null)}>
                        <Text>Back to List</Text>
                    </Button>
                    {isLoadingProduct ? (
                        <Text>Loading product details...</Text>
                    ) : productError ? (
                        <View className="gap-4">
                            <Text className="text-destructive">Failed to load product details</Text>
                            <Button onPress={() => refetchProduct()}>
                                <Text>Retry</Text>
                            </Button>
                        </View>
                    ) : product ? (
                        <View className="gap-2">
                            <Image
                                source={{ uri: product.image }}
                                style={{ width: 100, height: 100 }}
                            />
                            <Text className="text-lg font-bold">{product.title}</Text>
                        </View>
                    ) : null}
                </View>
            ) : (
                <ScrollView className="gap-4">
                    {products?.map((product) => (
                        <Button
                            key={product.id}
                            onPress={() => setSelectedProduct(product)}
                            className="flex-row items-center gap-2 p-2"
                        >
                            <Image
                                source={{ uri: product.image }}
                                style={{ width: 100, height: 100 }}
                            />
                            <View className="flex-1">
                                <Text className="font-medium" numberOfLines={1}>
                                    {product.title}
                                </Text>
                            </View>
                        </Button>
                    ))}
                </ScrollView>
            )}
        </View>
    );
} 