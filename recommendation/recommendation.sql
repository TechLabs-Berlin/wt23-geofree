WITH my_vars (var1) as (
 values ('furniture')
)

select item_id
 , RANK () OVER (
  ORDER BY item_available_timer ASC, n_likes desc, n_views ASC,  item_condition asc, distance ASC) ranking

from ranking_df, my_vars
where item_category = var1
limit 3;


WITH
my_vars (var1) as (
 values ('furniture')
),
t1 as (
select item_id, RANK () OVER (ORDER BY item_available_timer ASC, n_likes DESC, n_views ASC,  item_condition ASC, distance ASC) as ranking
from ranking_df, my_vars
where item_category = var1
limit 3
)

select *
from ranking_df rd
inner join t1
on rd.item_id = t1.item_id
order by t1.ranking;

