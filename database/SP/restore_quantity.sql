CREATE DEFINER=`admin`@`%` PROCEDURE `restore_quantity`(IN `oid` INT)
BEGIN
UPDATE mega_shop.products
       JOIN orders_details
       ON orders_details.product_id = products.id
SET    products.quantity = products.quantity + orders_details.quantity
WHERE orders_details.order_id = oid and orders_details.adminStatus = 0;
UPDATE mega_shop.orders_details SET is_admin_edited=1
WHERE order_id= oid;
END