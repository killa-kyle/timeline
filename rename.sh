# for f in *.png
# do
#     mv -n "$f" "$(date -r "$f" +"%Y%m%d_%H%M%S").png"
# done

for f in *.png
do
    mv -n "$f" "$(date -r "$f" +"%s").png"
done